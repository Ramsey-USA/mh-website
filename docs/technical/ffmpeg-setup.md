# Video Optimization Setup

FFmpeg is not installed in this dev container, but it **will be automatically installed** in GitHub Actions when the workflow runs.

## Testing Locally (Optional)

If you want to test video optimization locally, install FFmpeg:

### macOS

```bash
brew install ffmpeg
```

### Ubuntu/Debian (including this dev container)

```bash
sudo apt update && sudo apt install -y ffmpeg
```

### Windows

Download from: <https://ffmpeg.org/download.html>

## Verification

After installation, verify with:

```bash
ffmpeg -version
```

Then test the script:

```bash
npm run optimize:videos
```

## GitHub Actions

No local installation needed for automatic optimization - FFmpeg is installed automatically in the CI environment using the `FedericoCarboni/setup-ffmpeg@v3` action.
