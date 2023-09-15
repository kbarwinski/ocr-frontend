sed -i "s/\$PORT/$PORT/g" nginx.conf
nginx -g "daemon off;"