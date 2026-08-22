# 3D MNIST Digit Generator

An interactive React + Three.js experience that turns handwritten MNIST-style digits 1-9 into lit, volumetric geometry. The browser has a deterministic stroke-field fallback, so the demo works even when the optional Python service or trained model is unavailable.

## Frontend setup

```powershell
npm install
npm run dev
```

Open `http://localhost:5173`.

## Backend setup

Install Python 3.12 or newer first. On Windows, run this in PowerShell:

```powershell
winget install Python.Python.3.12
```

Close and reopen PowerShell after installation, then confirm Python is available:

```powershell
python --version
```

From the project root:

```powershell
python -m venv venv
.\\venv\\Scripts\\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload
```

If PowerShell blocks activation, allow scripts for your user account once, then activate again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.\\venv\\Scripts\\Activate.ps1
```

The API runs at `http://localhost:8000`. Set `VITE_API_URL` if it is hosted elsewhere. The frontend gracefully falls back to its local extrusion pipeline when the API is offline.

## API

- `GET /health` reports service and pipeline status.
- `GET /digits` lists supported digits and available samples.
- `POST /generate` accepts `{ "digit": 7, "sample": 1 }` and returns a normalized representation contract.
- `POST /predict` accepts the same request and returns a placeholder confidence until a trained classifier/generator is connected.

## Architecture

`src/components/DigitModel.tsx` owns the browser-side 2D-to-3D fallback. The stroke map is deliberately isolated so it can later be replaced by a service response built from MNIST pixels, contour extraction, and a trained model. `backend/app/main.py` owns the API contract and validation boundary.
