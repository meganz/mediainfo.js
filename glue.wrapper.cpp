#include <MediaInfo/MediaInfo.h>
#include <ZenLib/Ztring.h>
#include <algorithm>
#include <string>

class MediaInfo {
  MediaInfoLib::MediaInfo mi;
public:
  MediaInfo() {
    // mi.Option(__T("File_IsSeekable"), __T("1"));
  }
  int openBufferInit(double size, double offset) {
    return mi.Open_Buffer_Init((ZenLib::int64u)size, (ZenLib::int64u)offset);
  }
  int openBufferContinue(const unsigned char* data, long size) {
    return mi.Open_Buffer_Continue((ZenLib::int8u*)data, (ZenLib::int64u)size);
  }
  long long openBufferGetSeekTo() {
    return mi.Open_Buffer_Continue_GoTo_Get();
  }
  int openBufferFinalize() {
    return mi.Open_Buffer_Finalize();
  }
  const char* getOption(const char* key) {
    ZenLib::Ztring _key(key);
    return to_c(mi.Option(_key));
  }
  const char* setOption(const char* key, const char* value) {
    ZenLib::Ztring _key(key);
    ZenLib::Ztring _value(value);
    return to_c(mi.Option(_key, _value));
  }
  const char* inform() {
    return to_c(mi.Inform());
  }
  void close() {
    mi.Close();
  }
private:
  const char* to_c(MediaInfoLib::String s) {
    static char tmp[1048576];
    int len = std::min(s.size(), sizeof(tmp) - 1);
    tmp[len] = '\0';
    while (len-- > 0) {
        tmp[len] = s[len];
    }
    return (const char *)&tmp;
  }
};

typedef long long LongLong;
typedef unsigned char* Uint8Array;
typedef unsigned int* Uint32Array;

#include "mediainfo.glue.cpp"
