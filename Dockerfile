FROM      node:jessie

ENV       PYTHONIOENCODING="UTF-8"

RUN       apt-get update && \
          apt-get install -y python3 python3-pip xvfb wkhtmltopdf && \
          apt-get clean && \
          rm -rf /var/lib/apt/lists/*

RUN       pip3 install cssselect
RUN       pip3 install tinycss
RUN       pip3 install cairosvg
RUN       pip3 install pygal

WORKDIR   /var/www

COPY      package.json .
RUN       npm i

COPY      src src
COPY      templates templates