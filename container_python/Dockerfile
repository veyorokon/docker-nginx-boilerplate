FROM ubuntu:18.04
ARG PORT

ENV \
LANG=en_US.UTF-8 \
LANGUAGE=en_US:en \
LC_ALL=en_US.UTF-8 \
condafile=Miniconda3-4.6.14-Linux-x86_64.sh

RUN \
export DEBIAN_FRONTEND=noninteractive && \
apt-get -qq update && \
apt-get -qq -y --no-install-recommends install \
  build-essential \
  bzip2 \
  ca-certificates \
  curl \
  locales

RUN apt-get install -y wget

# install node
#RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && \
#  apt-get -y install nodejs

#RUN apt-get clean && apt-get update && apt-get install -y locales
#RUN locale-gen en_US.UTF-8


# install kubernetes
#RUN pip3 install kubernetes

# install miniconda
RUN \
locale-gen en_US.UTF-8 && \
wget -q -P /tmp --no-check-certificate https://repo.continuum.io/miniconda/$condafile && \
PREFIX=/usr/local/anaconda && \
bash /tmp/$condafile -bfp $PREFIX && \
rm -rf /tmp/$condafile && \
export PATH=$PREFIX/bin:$PATH && \
PYVER=$(python -c 'import sys; a,b=sys.version_info[:2]; print("{:d}.{:d}".format(a,b))') && \
echo "######### $PYVER ##########"

ENV PATH=/usr/local/anaconda/bin:$PATH

RUN env
COPY . /code
RUN \
cd /code && \
make build-wheel && \
#export SSL_NO_VERIFY=1 && \
echo "---------------------" && \
echo $HTTP_PROXY && \
echo $HTTPS_PROXY && \
echo "---------------------" && \
conda env update -n base -f ./conda/requirements.yml && \
pip install ./dist/*.whl && \
# cd ./test && \
# python -m pytest -s ./*.py && \
cd / && \
rm -rf /code


ENTRYPOINT [ "container_python" ]
