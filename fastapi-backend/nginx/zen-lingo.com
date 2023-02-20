coil@coil-VM:/etc/nginx/sites-enabled$ cat zen-lingo.com 
server {
  listen 8080;
  server_name localhost;

# when we go to localhost:3002 in browser, then the API calls will not worker
# since we do not redirect properly to backend, since this config works only for calls from 8080
# interesting


  location / {
    proxy_pass http://localhost:3002;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /api {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass_request_headers on;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
  }
}

coil@coil-VM:/etc/nginx/sites-enabled$ 

