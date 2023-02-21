server {
  listen 8081;
  server_name localhost;

  # Redirect HTTP traffic to HTTPS
  if ($scheme != "https") {
    return 301 https://$server_name$request_uri;
  }

#  location / {
#    proxy_pass http://localhost:3002;
#    proxy_set_header Host $host;
#    proxy_set_header X-Real-IP $remote_addr;
#  }
#
#  location /api {
#    rewrite /api(.*) $1 break;
#    proxy_pass http://localhost:8000;
#    proxy_set_header Host $host;
#    proxy_set_header X-Real-IP $remote_addr;
#    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#    proxy_pass_request_headers on;
#    proxy_http_version 1.1;
#    proxy_set_header Upgrade $http_upgrade;
#    proxy_set_header Connection 'upgrade';
#  }
}

server {
  listen 443 ssl;
  server_name localhost;

  ssl_certificate /home/coil/Desktop/fastapi_video_processing/zen-lingo.com.crt;
  ssl_certificate_key /home/coil/Desktop/fastapi_video_processing/zen-lingo.com.key;

  location / {
    proxy_pass http://localhost:3002;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /api {
    rewrite /api(.*) $1 break;
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
