# based on Nginx build app ready for production with Nginx
FROM nginx:1.15

RUN apt-get update && apt-get install -y \
  python \
  python-pip

RUN pip install docker

COPY ./test.py .

# Copy the nginx.conf

COPY  ./nginx.conf /etc/nginx/conf.d/default.conf
