
EMVER=1.37.21
EMPATH=/C/emsdk/emscripten/$(EMVER)
TARGET=mediainfo.js
WASM=mediainfo.wasm.js
GLUEJS=mediainfo.glue.js

MEDIAINFOLIB=MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a
ZENLIB=ZenLib/Project/GNU/Library/.libs/libzen.a
ZLIB=Shared/Source/zlib/libz.a

CC=emcc
CXX=em++
DEFINES=-DUNICODE
INCLUDES=-I MediaInfoLib/Source -I ZenLib/Source
CXXFLAGS=-std=c++11 -Oz --llvm-lto 3
OBJS=glue.wrapper.o
WASMFLAGS=-s WASM=1 -s 'BINARYEN_METHOD="native-wasm"' -g1
LDFLAGS=-s TOTAL_MEMORY=268435456 -s NO_FILESYSTEM=1 -s MODULARIZE=1 -s NO_DYNAMIC_EXECUTION=1 \
	-s DISABLE_EXCEPTION_CATCHING=1 -s ELIMINATE_DUPLICATE_FUNCTIONS=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=0 \
	-s INVOKE_RUN=0 -s NO_EXIT_RUNTIME=1 \
	$(MEDIAINFOLIB) $(ZENLIB) $(ZLIB) --post-js $(GLUEJS)
# -s MEM_INIT_METHOD=2 --memory-init-file 0
#--js-transform cat

all: $(TARGET) exts.txt

$(WASM): $(MEDIAINFOLIB) $(ZENLIB) $(ZLIB) $(GLUEJS) $(OBJS) post.js
	$(CXX) $(CXXFLAGS) $(OBJS) $(WASMFLAGS) $(LDFLAGS) -o $@

$(TARGET): $(MEDIAINFOLIB) $(ZENLIB) $(ZLIB) $(GLUEJS) $(OBJS) post.js
	$(CXX) $(CXXFLAGS) $(OBJS) $(LDFLAGS) -o $@
	@mv mediainfo.js mediainfo_.js
	@mv mediainfo.js.mem mediainfo.mem
	@cat pre.js mediainfo_.js post.js | sed 's/\.js\.mem/.mem/' > mediainfo.js
	@rm mediainfo_.js

%.o: %.cpp
	$(CXX) $(CXXFLAGS) $(INCLUDES) $(DEFINES) -c $< -o $@

$(GLUEJS): mediainfo.idl $(EMPATH)/tools/webidl_binder.py
	python $(EMPATH)/tools/webidl_binder.py mediainfo.idl mediainfo.glue
	-@rm $(OBJS)

exts.txt: MediaInfoLib/Source/Resource/Text/DataBase/Format.csv
	@cat MediaInfoLib/Source/Resource/Text/DataBase/Format.csv | \
		grep -P ';(video|audio)/|mkv' | \
		awk '{split($$0,a,";"); print a[7]}' | \
		sed '/^\s*$$/d' | \
		tr ' ' '\n' | \
		sort | \
		tr '\n' ' ' | \
		sed 's/\s/./g' >$@

clean:
	@rm -fv *.o $(GLUEJS) $(TARGET) 

install:
	cp mediainfo.mem ../../webclient
	cp mediainfo.js ../../webclient/js/vendor
