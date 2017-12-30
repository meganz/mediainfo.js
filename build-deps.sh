#!/bin/bash

# ZLIB=1.2.8
# MEDIAINFO=0.7.82
# LIBZEN=0.4.32
ZLIB=1.2.11
MEDIAINFO=17.10
LIBZEN=0.4.37

# download sources
wget https://mediaarea.net/download/source/libmediainfo/$MEDIAINFO/libmediainfo_$MEDIAINFO.tar.bz2 -q -O - | tar -xj
wget https://mediaarea.net/download/source/libzen/$LIBZEN/libzen_$LIBZEN.tar.bz2 -q -O - | tar -xj
mkdir -p Shared/Source
wget http://zlib.net/zlib-$ZLIB.tar.gz -q -O - | tar -xz -C Shared/Source
mv Shared/Source/zlib-$ZLIB Shared/Source/zlib

# zlib
cd Shared/Source/zlib
CFLAGS=-Os emconfigure ./configure --static
emmake make
cd ../../..

# Zenlib
cd ZenLib/Project/GNU/Library/
./autogen.sh
emconfigure ./configure --enable-static --disable-shared --host=le32-unknown-nacl
emmake make
cd ../../../..

# MediaInfoLib
cd MediaInfoLib/Project/GNU/Library
./autogen.sh
emconfigure ./configure --with-libz-static --host=le32-unknown-nacl --enable-minimize-size --enable-minimal --disable-archive --disable-image --disable-tag --disable-text --disable-swf --disable-flv --disable-hdsf4m --disable-cdxa --disable-dpg --disable-pmp --disable-rm --disable-wtv --disable-mxf --disable-dcp --disable-aaf --disable-bdav --disable-bdmv --disable-dvdv --disable-gxf --disable-mixml --disable-skm --disable-nut --disable-tsp --disable-hls --disable-dxw --disable-dvdif --disable-dashmpd --disable-aic --disable-avsv --disable-canopus --disable-ffv1 --disable-flic --disable-huffyuv --disable-prores --disable-y4m --disable-adpcm --disable-amr --disable-amv --disable-ape --disable-au --disable-la --disable-celt --disable-midi --disable-mpc --disable-openmg --disable-pcm --disable-ps2a --disable-rkau --disable-speex --disable-tak --disable-tta --disable-twinvq --disable-references 
emmake make
