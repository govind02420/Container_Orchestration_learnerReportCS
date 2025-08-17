# Learner Report Deployment

This repository contains deployment manifests for the Learner Report application, which consists of:
- Backend API (Node.js / Python / etc.)
- Frontend UI (React / Angular / Vue)
- MongoDB Database

You can deploy the application either using raw Kubernetes manifests (k8s/) or the Helm chart (charts/learner-report/).

#
## Deployment

### 1. Kubernetes (YAML Manifests) 
 - Deploy All Components
```bash
kubectl apply -f k8s/
```
 - Check Pods & Services
```bash
kubectl get pods
kubectl get svc
```

 - Port-Forward (Frontend on 8081, Backend on 3000)
```bash
kubectl port-forward svc/learner-report-fe-service 8081:3000
kubectl port-forward svc/learner-report-be-service 3000:3000
```
 - Now open:
- Frontend → http://localhost:8081
- Backend → http://localhost:3000

#
### 2. Helm Chart (Preferred)
 - Install Helm Release
```bash
helm install learner ./charts/learner-report -n learner-report --create-namespace
```
 - Upgrade Deployment (after changes)
 ```bash
 helm upgrade learner ./charts/learner-report -n learner-report
```
 - Uninstall
 ``` bash
 helm uninstall learner -n learner-report
```
 - Port-Forward (Frontend on 8083, Backend on 5001)
 ``` bash
kubectl port-forward svc/learner-learner-report-frontend 8083:3000 -n learner-report
kubectl port-forward svc/learner-learner-report-backend 5001:5000 -n learner-report
```
#
## Project Structure

```bash
learnerReportCS/
│
├── k8s/                           # Raw Kubernetes YAMLs
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   └── ingress.yaml               # Optional: plain ingress
│
├── charts/                        # Helm charts
│   └── learner-report/            # Your Helm chart (name = release name)
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── templates/
│       │   ├── deployment-backend.yaml
│       │   ├── service-backend.yaml
│       │   ├── deployment-frontend.yaml
│       │   ├── service-frontend.yaml
│       │   ├── deployment-mongo.yaml
│       │   ├── service-mongo.yaml
│       │   ├── ingress.yaml
│       │   └── NOTES.txt
│       └── _helpers.tpl
│
├── Jenkinsfile                     # For CI/CD automation
├── README.md                       # Docs on how to deploy (kubectl vs helm)
└── .gitignore

```
#

## CI/CD with Jenkins
- Jenkins runs ``` helm upgrade --install``` for automated deployments.
- Raw YAMLs in ```k8s/``` serve as a fallback for manual testing/debugging.
- Adjust Jenkinsfile to suit your pipeline (build → push image → deploy via Helm).
#
## Troubleshooting
- *Pods stuck in Pending* → check ```kubectl describe pod <pod-name>``` for missing resources or PVC issues.

- *Port-forward fails* → ensure pods are running:
```bash
kubectl get pods -n learner-report
```
- *Namespace errors* → make sure ```learner-report``` namespace exists.
