# Nginx Configuration

Currently the django application serves the bundled vue code as static assets, which pose a number
of issues in terms of serving the resources through a web server like nginx. Currently, a workaround
we have developed is to forcably open the static asset endpoints via the nginx config file, an example of
which can be seen below



```nginx 
upstream django {
    server unix:/opt/arches/arches_project/uwsgi.sock;
}

server {
    server_name arches-app-demo.opentechstrategies.com;

    charset utf-8;
    client_max_body_size 75M;

    error_log /var/log/nginx/arches_error.log;
    access_log /var/log/nginx/arches_access.log;

    location /media {
        alias /opt/arches/arches_project/arches_project/media;
    }

    location /static {
        alias /opt/arches/arches_project/arches_project/staticfiles;
    }

    location / {
        uwsgi_pass django;
        include /etc/nginx/uwsgi_params;

        uwsgi_param Host $http_host;
        uwsgi_param X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_redirect off;
    }

    # HACK TO MAKE IT WORK FOR APPLICATION DEMO.

    location /static/archesdataviewer {
        alias /opt/arches/.venv/lib/python3.11/site-packages/archesdataviewer/static;
    }
   
    location ~ ^/archesdataviewer/(.+\.png)$ {
        alias /opt/arches/.venv/lib/python3.11/site-packages/archesdataviewer/static/$1;
    }

    location ~ ^/archesdataviewer/(.+\.(?:css|js))$ {
        alias /opt/arches/.venv/lib/python3.11/site-packages/archesdataviewer/static/$1;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/arches-app-demo.opentechstrategies.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/arches-app-demo.opentechstrategies.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}


server {
    if ($host = arches-app-demo.opentechstrategies.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name arches-app-demo.opentechstrategies.com;
    return 404; # managed by Certbot
}

server {
    if ($host = arches-app-demo.opentechstrategies.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name arches-app-demo.opentechstrategies.com;
    listen 80;
    return 404; # managed by Certbot
}

```