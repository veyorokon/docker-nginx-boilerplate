SHELL := bash
DOCKER_NAME := docker-registry.com/container_python
CMD := container_python
PORT := 8000
WHL := container_python-0.0.1-py3-none-any.whl
CONDA := $(shell bash -c 'grep -rw ./conda/requirements.yml -e name | cut -f 2  -d " " /dev/stdin')

.PHONY: help install build-conda-pkg build-wheel build-docker run clean stop test
.PHONY: conda-env delete-conda-env run-bash

help:
	@echo "Please use 'make target' where target is one of"
	@echo "  build-conda-pkg   Builds conda package"
	@echo "  build-wheel       Builds pip wheel"
	@echo "  build-docker      Builds docker container"
	@echo "  run               Runs docker container"
	@echo "  stop              Stops docker container"
	@echo "  clean             Removes known artifacts created during build steps"
	@echo "  conda-env         Create Conda Environment"
	@echo "  delete-conda-env  Deletes Conda Environment"

build-conda-pkg: dist
#	conda install conda-build -y --override-channels --channel defaults
	find . -name "__pycache__" | xargs rm -rf
	CODE=${PWD}/.. conda build --croot /tmp/conda-bld --output-folder dist conda
	rm -rf /tmp/conda-bld

build-wheel: dist
	python setup.py bdist_wheel -b build -d dist

build-docker:
	DOCKER_BUILDKIT=1 docker build -t $(DOCKER_NAME) --build-arg PORT=$(PORT) -f Dockerfile .
	docker push $(DOCKER_NAME)
	make clean

run:
	docker run --name $(CMD) --rm -d -v /dev/shm --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=1g --shm-size=1g -p $(PORT):$(PORT) $(DOCKER_NAME)

run-bash:
	docker run --name $(CMD) --entrypoint="" -v /dev/shm --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=1g --shm-size=1g -p $(PORT):$(PORT) $(DOCKER_NAME) bash
stop:
	docker rm -f $(CMD)

clean:
	rm -rf build
	rm -rf dist
	rm -rf docs
	rm -rf *.egg-info
	find . -name ".pytest_cache" | xargs rm -rf
	find . -name "__pycache__" | xargs rm -rf
	rm -rf test/*.txt
	rm -rf test/*.log
	rm -rf test/*.xml
	rm -rf test/.cov*
	rm -rf test/*.props

dist:
	mkdir dist

test: clean
	./test/run_tests.sh
	make clean

conda-env:
	conda clean -i
	conda env update -f conda/requirements.yml

delete-conda-env:
	conda env remove -n $(CONDA)
