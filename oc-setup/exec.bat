@echo off
REM Batch script to get logs from a specific pod while excluding a deployment pod

REM Use the first argument as the pod name filter
SET "POD_NAME_FILTER=%1"
SET "EXCLUDE_DEPLOY=%POD_NAME_FILTER%-1-deploy"

REM Retrieve all pod names containing the filter string
FOR /F "tokens=1" %%i IN ('oc get pods --no-headers ^| findstr %POD_NAME_FILTER%') DO (
    REM Check if the current pod matches the desired pattern and does not include the exclusion
    echo %%i | findstr /R "^flask-api-[0-9]-[a-zA-Z0-9]*$" >nul
    IF ERRORLEVEL 0 (
        REM Ensure the pod name is not the deploy pod
        echo %%i | findstr %EXCLUDE_DEPLOY% >nul
        IF ERRORLEVEL 1 (
            REM Get logs for the matching pod
            oc exec -it %%i -- /bin/bash
        )
    )
)

echo Done.
