#!/usr/bin/env python
# -*- coding: utf-8 -*-
import codecs
import os
import re
from setuptools import setup, find_packages

wheel_pkg_name = 'container_python'
pkg_name = 'container_python'
pkg_src = 'src'
author = 'Vahid Eyorokon'
email = 'vahid.eyorokon@wright.edu'
description = 'Example container using python wheel'

here = os.path.abspath(os.path.dirname(__file__))


def read(*parts):
    with codecs.open(os.path.join(here, *parts), 'r') as fp:
        return fp.read()


def find_version(*file_paths):
    version_file = read(*file_paths)
    version_match = re.search(
        r"^__version__ = ['\"]([^'\"]*)['\"]",
        version_file,
        re.M,
    )
    if version_match:
        return version_match.group(1)

    raise RuntimeError("Unable to find version string.")


long_description = read('README.md')

setup(
    name=pkg_name,
    version="1.0",
    #version=find_version(pkg_name, "__init__.py"),
    author=author,
    author_email=email,
    entry_points={
        'console_scripts': [
            '{} = {}.server:main'.format(wheel_pkg_name, pkg_src)
        ],
    },
    package_data={
        pkg_name: ['openapi/*.yaml'],
    },
    packages=find_packages(),
    url='',
    license="TBD",
    description=(description),
    long_description=long_description,
    zip_safe=True,
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Programming Language :: Python",
    ],
)
