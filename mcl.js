#!/usr/bin/env node

String.trim = String.trim || (s => String(s).trim());

const fs = require('fs');
const path = 'MediaInfoLib/Source/Resource/Text/DataBase/';

const read = (n) => fs.readFileSync(path + n + '.csv', 'utf-8')
                    .split(/\r?\n/).map(String.trim).filter(String)
                    .sort().reverse().map(s => s.split(';'));

// from https://github.com/stephensolis/ustvnow-client/blob/master/codec_names.py
const mp4a = ["mp4a", "mp4a-40", "mp4a-40-1", "mp4a-40-2", "mp4a-40-3", "mp4a-40-4", "mp4a-40-5", "mp4a-40-6", "mp4a-40-7", "mp4a-40-8", "mp4a-40-9", "mp4a-40-12", "mp4a-40-13", "mp4a-40-14", "mp4a-40-15", "mp4a-40-16", "mp4a-40-17", "mp4a-40-19", "mp4a-40-20", "mp4a-40-21", "mp4a-40-22", "mp4a-40-23", "mp4a-40-24", "mp4a-40-25", "mp4a-40-26", "mp4a-40-27", "mp4a-40-28", "mp4a-40-29", "mp4a-40-32", "mp4a-40-33", "mp4a-40-34", "mp4a-40-35", "mp4a-40-36", "mp4a-66", "mp4a-67", "mp4a-68", "mp4a-69", "mp4a-6B"];
const mp4v = ["mp4v","mp4v-20","mp4v-20-1","mp4v-20-10","mp4v-20-100","mp4v-20-11","mp4v-20-113","mp4v-20-114","mp4v-20-12","mp4v-20-129","mp4v-20-130","mp4v-20-145","mp4v-20-146","mp4v-20-147","mp4v-20-148","mp4v-20-16","mp4v-20-161","mp4v-20-162","mp4v-20-163","mp4v-20-17","mp4v-20-177","mp4v-20-178","mp4v-20-179","mp4v-20-18","mp4v-20-180","mp4v-20-193","mp4v-20-194","mp4v-20-1d","mp4v-20-1e","mp4v-20-1f","mp4v-20-2","mp4v-20-209","mp4v-20-21","mp4v-20-210","mp4v-20-211","mp4v-20-22","mp4v-20-225","mp4v-20-226","mp4v-20-227","mp4v-20-228","mp4v-20-229","mp4v-20-230","mp4v-20-231","mp4v-20-232","mp4v-20-240","mp4v-20-241","mp4v-20-242","mp4v-20-243","mp4v-20-244","mp4v-20-245","mp4v-20-247","mp4v-20-248","mp4v-20-249","mp4v-20-250","mp4v-20-251","mp4v-20-252","mp4v-20-253","mp4v-20-29","mp4v-20-3","mp4v-20-30","mp4v-20-31","mp4v-20-32","mp4v-20-33","mp4v-20-34","mp4v-20-4","mp4v-20-42","mp4v-20-5","mp4v-20-50","mp4v-20-51","mp4v-20-52","mp4v-20-6","mp4v-20-61","mp4v-20-62","mp4v-20-63","mp4v-20-64","mp4v-20-66","mp4v-20-71","mp4v-20-72","mp4v-20-8","mp4v-20-81","mp4v-20-82","mp4v-20-9","mp4v-20-91","mp4v-20-92","mp4v-20-93","mp4v-20-94","mp4v-20-97","mp4v-20-98","mp4v-20-99","mp4v-20-a1","mp4v-20-a2","mp4v-20-a3","mp4v-20-b1","mp4v-20-b2","mp4v-20-b3","mp4v-20-b4","mp4v-20-c1","mp4v-20-c2","mp4v-20-d1","mp4v-20-d2","mp4v-20-d3","mp4v-20-e1","mp4v-20-e2","mp4v-20-e3","mp4v-20-e4","mp4v-20-e5","mp4v-20-e6","mp4v-20-e7","mp4v-20-e8","mp4v-20-f0","mp4v-20-f1","mp4v-20-f2","mp4v-20-f3","mp4v-20-f4","mp4v-20-f5","mp4v-20-f7","mp4v-20-f8","mp4v-20-f9","mp4v-20-fa","mp4v-20-fb","mp4v-20-fc","mp4v-20-fd"];

// list of containers to ignore
const format_exclusion = ["Atrac","Atrac3","BDAV","Blu-ray Clip info","Blu-ray Index","Blu-ray Movie object","Blu-ray Playlist","CDDA","CDXA","DASH MPD","DPG","DVD Video","Flash Video","HDS F4M","HLS","ISM","MXF","PMP","PTX","RealMedia","ShockWave","SKM","FLC","FLI","FLIC","Extended Module","MIDI","Module","RIFF-MIDI","Scream Tracker 3"];

// codecs/formats found at some random videos from samples.mplayerhq.hu
const smp_containers = ["MLP","XAVC","avs2","dash","dby1","hvc1","jpx ","kddi","mobi","mqt ","wmf "];
const smp_audio = [".mp1","00000001-0000-0010-8000-00AA00389B71","128","129","1501","17-2","17-5","28E","28F","4150","594A","706D","8180-5","A_AAC-2","A_QUICKTIME/QDM2","DWVW","E708","FF-2","FL32","FL64","G726","GSM ","MLP","OggV","PCM","SPXN","agsm","ilbc","mp4a-67-1","mp4a-D1","mp4a-DD","mp4a-E1","sawp","spex","sqcp"];
const smp_video = ["0x00000000","0x00026932","0x01000000","0x02000000","0x02000010","0x04000000","0x04006931","16","2","27","36","422P","ACDV","AVj2","CVC1","DCOD","DIGI","DIRC","DXD3","DXDI","EM4A","ES07","FICV","FMVC","G264","G2M4","GAVC","GEOV","HHE1","HV60","I263","IMM4","IMM5","JRV1","KDH4","KDM4","KGV1","L264","LM20","LZOC","LZRW","M102","M103","M104","M701","M704","M705","MFZ0","MJLS","MOHD","MSA1","MSC2","MV30","MV43","MVDV","MVLZ","MWSC","Mczm","N264","P422","PLV1","PSIV","QMP4","R10g","R10k","RAYL","RSCC","RuSH","SCLS","SCPR","SHQ0","SHQ1","SHQ2","SHQ3","SHQ4","SHQ5","SHQ7","SHQ9","SIRF","SMP4","SMV2","SN40","SPV1","SUVF","Shr5","Shr6","T263","UQY2","UYNY","VDEC","VGMV","VMnc","VXTR","V_MJPEG","V_QUICKTIME","WAWV","WPY2","Xxan","YLC0","ZECO","ZJPG","ZyGo","a12v","auv2","avs2","azpr","div3","dmb1","dtPA","dtnt","dx50","fire","flic","gisz","lsvm","lsvx","mp4v-61","mp4v-6A","pxlt","qdrw","r10k","rle1","tga ","tiff","tsc2","ty0n","v308","v408","v410","vivo","xmpg","xtor","yuv4","yuv8","yv12"];

const shortformats = [
    // [container, videocodec, audiocodec]
    // They need to be checked against CodecID, failing back to Format since e.g. Ogg doesn't provides CodecID
    // NB: CodecID may contains a list of codecs, seen in some mkv (CodecID: V_MS/VFW/FOURCC / WVC1)
    ['isom', 'avc1', 'mp4a-40-2'], // MPEG-4 Base Media
    ['mp42', 'avc1', 'mp4a-40-2'], // MPEG-4 Base Media / Version 2
    ['M4VP', 'avc1', 'mp4a-40-2'], // MPEG-4 Apple iPhone
    ['M4V ', 'avc1', 'mp4a-40-2'], // MPEG-4 Video
    ['qt  ', 'avc1', 'mp4a-40-2'], // MPEG-4 QuickTime
    ['qt  ', 'avc1', 'ac-3'], // samples/h264-ac3.mov
    ['qt  ', 'avc1', 'ec-3'], // samples/h264-eac3.mov
    ['qt  ', 'avc1', 'dtsc'], // samples/h264-dca.mov
    ['qt  ', 'hev1', 'mp4a-40-2'], // samples/hevc-aac.mov
    ['qt  ', 'hev1', 'ac-3'], // samples/hevc-ac3.mov
    ['qt  ', 'hev1', 'ec-3'], // samples/hevc-eac3.mov
    ['qt  ', 'hev1', 'dtsc'], // samples/hevc-dca.mov
    ['isom', 'avc1', 'ac-3'], // samples/h264-ac3.mp4
    ['isom', 'avc1', 'ec-3'], // samples/h264-eac3.mp4
    ['isom', 'avc1', 'mp4a-A9'], // samples/h264-dca.mp4
    ['isom', 'hev1', 'mp4a-40-2'], // samples/hevc-aac.mp4
    ['isom', 'hev1', 'ac-3'], // samples/hevc-ac3.mp4
    ['isom', 'hev1', 'ec-3'], // samples/hevc-eac3.mp4
    ['isom', 'hev1', 'mp4a-A9'], // samples/hevc-dca.mp4
    ['WebM', 'V_VP8', 'A_VORBIS'], // samples/vp8-vorbis.webm
    ['WebM', 'V_VP8', 'A_OPUS'], // samples/vp8-opus.webm
    ['WebM', 'V_VP9', 'A_VORBIS'], // samples/vp9-vorbis.webm
    ['WebM', 'V_VP9', 'A_OPUS'], // samples/vp9-opus.webm
    ['Ogg', 'Theora', 'Vorbis'], // samples/theora-vorbis.ogg
    ['Ogg', 'Theora', 'Opus'], // samples/theora-opus.ogg
    ['Ogg', 'Theora', 'FLAC'], // samples/theora-flac.ogg
    ['QuickTime', 'mp4v-20', 'mp4a-40-2'],
    ['Windows Media', 'WMV1', 161 /*WMA*/],
    ['Windows Media', 'WMV2', 161 /*WMA*/],
    ['Windows Media', 'WMV3', 161 /*WMA*/],
    ['Windows Media', 'MP43', 161 /*WMA*/],
    ['Matroska', 'V_MPEG4/ISO/AVC', 'A_AC3'], // samples/h264-ac3.mkv
    ['Matroska', 'V_MPEG4/ISO/AVC', 'A_DTS'], // samples/h264-dca.mkv
    ['Matroska', 'V_MPEG4/ISO/AVC', 'A_EAC3'], // samples/h264-eac3.mkv
    ['Matroska', 'V_MPEG4/ISO/AVC', 'A_AAC-2'], // samples/h264-aac.mkv
    ['Matroska', 'V_MPEGH/ISO/HEVC', 'A_AAC-2'], // samples/hevc-aac.mkv
    ['Matroska', 'V_MPEGH/ISO/HEVC', 'A_EAC3'], // samples/hevc-eac3.mkv
    ['Matroska', 'V_MPEGH/ISO/HEVC', 'A_AC3'], // samples/hevc-ac3.mkv
    ['Matroska', 'V_MPEGH/ISO/HEVC', 'A_DTS'], // samples/hevc-dca.mkv
    ['AVI', 'DIV3', 55 /*MP3*/],
    ['AVI', 'DIVX', 55 /*MP3*/],
    ['AVI', 'DX50', 55 /*MP3*/],
    ['AVI', 'XVID', 55 /*MP3*/],
    ['AVI', 'FMP4', 55 /*MP3*/],
    ['AVI', 'H264', 55 /*MP3*/], // samples/h264-mp3.avi
    ['MPEG-PS', 'AVC', 'MPEG Audio'], // samples/h264-mp3.mpg
    ['MPEG-PS', 'MPEG Video', 'MPEG Audio'], // samples/mpeg2video-mp3.mpg
    ['MPEG-PS', 'MPEG-4 Visual', 'MPEG Audio'], // samples/mpeg4-mp3.mpg
    ['MPEG Audio', -1, 'MPEG Audio'], // audio-only m1a mpa1 mp1 m2a mpa2 mp2 mp3
    ['M4A ', -1, 'mp4a-40-2'], // audio-only mp4, m4a etc..
    ['FLAC', -1, 'FLAC'],
    ['Wave', -1, 1 /*PCM*/],
    ['WebM', 'V_AV1', 'A_VORBIS'], // samples/av1-vorbis.webm
    ['WebM', 'V_AV1', 'A_OPUS'], // samples/av1-opus.webm
    ['isom', 'av01', 'mp4a-40-2'], // samples/av1-aac.mp4
    ['isom', 'av01', 'ac-3'], // samples/av1-ac3.mp4
    ['Matroska', 'V_AV1', 'A_OPUS'], // samples/av1-opus.mkv
    ['mp42', 'av01', 'mp4a-40-2'],
    // ['', '', ''],
];

let mcv = 1;
let sfid = 0;
let shortformat = [];
let [ containers, video, audio ] = JSON.parse(fs.readFileSync('mcl.json', 'utf-8'))[1];

containers = containers.map(x => ''+x[1]);
video = video.map(x => ''+x[1]);
audio = audio.map(x => ''+x[1]);

const push = (a, v) => (v && parseInt(v) !== 0) && a.indexOf(''+v) < 0 && a.push(''+v);
const addContainer = c => push(containers, c);
const addVideo = v => push(video, v);
const addAudio = a => push(audio, a);

const readAndForEach = (file, cb) => {
    const data = read(file);

    for (let i = data.length; i--;) {
        let item = data[i];

        // common fields for CodecID_(Audio|Video)_*.csv files
        let CodecID = item[0];
        let Format = item[1];
        let CodecID_Hint = item[2];
        let CodecID_Info = item[3];
        let CodecID_Url = item[4];

        cb(CodecID, Format, CodecID_Hint, CodecID_Info, CodecID_Url);
    }
};

const addAudioVideoCodecs = type => {
    // XXX: we may don't need to add the Formats from these files, but maybe handy to have them all
    let addVideoAndFormat = (CodecID, Format) => (addVideo(CodecID), addContainer(Format));
    let addAudioAndFormat = (CodecID, Format) => (addAudio(CodecID), addContainer(Format));

    readAndForEach('CodecID_Video_' + type, addVideo/*AndFormat*/);
    readAndForEach('CodecID_Audio_' + type, addAudio/*AndFormat*/);
};

const fixuplist = a => a/*.sort()*/.map(n => parseInt(n, 10) == n ? parseInt(n) : String(n));
const makeindexes = a => a.map((e, i) => [++i, e]);

const mpeg4general = read('CodecID_General_Mpeg4');
const formats = read('Format');

for (let i = formats.length; i--;) {
    let item = formats[i];
    let format = item[0];
    let type = item[3];

    if (type === 'M' || type === 'A' || type === 'V') {
        if (format_exclusion.indexOf(format) == -1) {
            addContainer(format);
        }

        if (type === 'A') {
            addAudio(format);
        }
        else if (type === 'V') {
            addVideo(format);
        }
    }
}

for (let i = mpeg4general.length; i--;) {
    let item = mpeg4general[i];
    let codec = item[0];
    let format = item[1];
    let format_profile = item[5];

    addContainer(codec);
    addContainer(format);
}

addAudioVideoCodecs('Mpeg4');
addAudioVideoCodecs('Matroska');
addAudioVideoCodecs('Riff');

mp4a.forEach(addAudio);
mp4v.forEach(addVideo);

smp_containers.forEach(addContainer);
smp_video.forEach(addVideo);
smp_audio.forEach(addAudio);

// let's see if we got everything from Codec.csv covered
const codeccsv = read('Codec').concat(function() {
    try {
        // Adding codecs for samples generated by the ffsamples script
        return read('../../../../../ffsamples');
    }
    catch (ex) {}
    return [];
}());
const realcc = read('CodecID_Audio_Real').concat(read('CodecID_Video_Real')).map(a => a[0]);
const orphancodecs = [];
for (let i = codeccsv.length; i--;) {
    let item = codeccsv[i];
    let codecs = String(item[0]).split(' / ');
    let format = item[1];
    let hint = item[2];
    let type = item[3];

    for (let u = codecs.length; u--;) {
        let codec = codecs[u];

        if (realcc.indexOf(codec) != -1 || hint.indexOf('Real') != -1 || hint.indexOf('ADPCM') != -1) {
            continue;
        }

        switch(type) {
            case 'M':
                if (format && containers.indexOf(format) < 0) {
                    addContainer(format);
                    orphancodecs.push(format);
                }
                if (codec && containers.indexOf(codec) < 0) {
                    addContainer(codec);
                    orphancodecs.push(codec);
                }
                break;
            case 'A':
                if (format && !codec && audio.indexOf(format) < 0) {
                    addAudio(format);
                    orphancodecs.push(format);
                }
                if (codec && audio.indexOf(codec) < 0) {
                    addAudio(codec);
                    orphancodecs.push(codec);
                }
                break;
            case 'V':
                if (format && !codec && video.indexOf(format) < 0) {
                    addVideo(format);
                    orphancodecs.push(format);
                }
                if (codec && video.indexOf(codec) < 0) {
                    addVideo(codec);
                    orphancodecs.push(codec);
                }
                break;
        }
    }
}

for (let i; (i = orphancodecs.indexOf('0x00000000')) > -1; ) {
    orphancodecs.splice(i, 1);
}
if (orphancodecs.length) {
    process.stderr.write('Orphan codecs added from Codec.csv: ' + orphancodecs + '\n');
}

// sort final arrays
containers = fixuplist(containers);
video = fixuplist(video);
audio = fixuplist(audio);

// Generate shortformats
for (let x = 0; x < shortformats.length; x++) {
    let container = shortformats[x][0];
    let videocodec = shortformats[x][1];
    let audiocodec = shortformats[x][2];

    let c = containers.indexOf(container) + 1;
    if (!c) die('container not found ' + container);

    let v = video.indexOf(videocodec) + 1;
    if (!v) {
        if (videocodec === -1) {
            v = 0; // audio-only
        }
        else {
            die('videocodec not found ' + videocodec);
        }
    }

    let a = audio.indexOf(audiocodec) + 1;
    if (!a) die('audiocodec not found ' + audiocodec);

    shortformat.push([++sfid, c, v, a]);
}

containers = makeindexes(containers);
video = makeindexes(video);
audio = makeindexes(audio);

const list = [
    ++mcv, // version
    [containers,video,audio,shortformat]
];
fs.writeFileSync('mcl.json', JSON.stringify(list));

die(JSON.stringify(shortformat))

function die() {
    console.error.apply(console, arguments);
    process.exit(1);
}
