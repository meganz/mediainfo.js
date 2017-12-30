return function MediaInfoLib(opts) {
    return new Promise(function(resolve) {
        Module(Object.assign({}, opts, {
            onRuntimeInitialized: function() {
                var Module = this;
                var modMediaInfo = Module.MediaInfo;
                var MediaInfo = function MediaInfo() {
                    modMediaInfo.call(this);
                };
                MediaInfo.prototype = Object.create(modMediaInfo.prototype);
                MediaInfo.prototype.constructor = MediaInfo;

                MediaInfo.prototype.openBufferGetSeekTo = (function(openBufferGetSeekTo) {
                    return function openBufferGetSeekToWrapper() {
                        var res = openBufferGetSeekTo.call(this);
                        var tempRet0 = Module.Runtime.getTempRet0();
                        return Module.Runtime.makeBigInt(res, tempRet0, !1);
                    };
                })(modMediaInfo.prototype.openBufferGetSeekTo);

                MediaInfo.prototype.openBufferContinue = (function(openBufferContinue) {
                    return function openBufferContinueWrapper(a0, a1) {
                        if (a0 instanceof ArrayBuffer) {
                            a0 = new Uint8Array(a0);
                        }

                        var ptr = Module._malloc(a0.byteLength | 0);
                        if (ptr) {
                            Module.HEAPU8.set(a0, ptr);
                            a0 = {ptr: ptr};
                        }

                        var res = openBufferContinue.call(this, a0, a1);

                        if (ptr) {
                            Module._free(ptr);
                        }

                        return res;
                    };
                })(modMediaInfo.prototype.openBufferContinue);

                resolve(new MediaInfo());
                Module.memoryInitializerRequest = MediaInfo = modMediaInfo = resolve = undefined;
            }
        }));
        opts = undefined;
    });
};
}));
