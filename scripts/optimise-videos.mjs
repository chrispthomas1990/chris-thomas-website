import { mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { spawnSync } from "node:child_process";

const caseStudiesDirectory = "src/assets/case-studies";
const widths = [1280];

function discoverVideos(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return entry.name === "optimised" ? [] : discoverVideos(path);
    }

    return entry.isFile() && extname(entry.name).toLowerCase() === ".mp4"
      ? [path]
      : [];
  });
}

function needsOptimisation(source, outputs) {
  const sourceModifiedAt = statSync(source).mtimeMs;

  return outputs.some((output) => {
    try {
      return statSync(output).mtimeMs < sourceModifiedAt;
    } catch {
      return true;
    }
  });
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`);
  }
}

const videos = discoverVideos(caseStudiesDirectory);

if (videos.length === 0) {
  console.log(`No source MP4 files found in ${caseStudiesDirectory}.`);
}

for (const source of videos) {
  const outputDirectory = join(dirname(source), "optimised");
  const stem = basename(source, extname(source));
  mkdirSync(outputDirectory, { recursive: true });

  for (const width of widths) {
    const webmOutput = join(outputDirectory, `${stem}-${width}.webm`);
    const mp4Output = join(outputDirectory, `${stem}-${width}.mp4`);

    if (!needsOptimisation(source, [webmOutput, mp4Output])) {
      console.log(`Up to date: ${source} (${width}px)`);
      continue;
    }

    console.log(`Optimising: ${source} (${width}px)`);
    const scale = `scale='min(${width},iw)':-2`;

    run("ffmpeg", [
      "-y",
      "-i",
      source,
      "-map",
      "0:v:0",
      "-an",
      "-vf",
      scale,
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "31",
      "-b:v",
      "0",
      "-row-mt",
      "1",
      webmOutput,
    ]);

    run("ffmpeg", [
      "-y",
      "-i",
      source,
      "-map",
      "0:v:0",
      "-an",
      "-vf",
      scale,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      mp4Output,
    ]);
  }
}
