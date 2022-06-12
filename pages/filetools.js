export const tmpDirName = 'whde_tmp';

export function formatSize(bytes) {
	if (bytes === 0) return '0 B';
	var k = 1024,
		sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

export function makeThumb(item) {
	let type = item.type;
	var url = item.url;

	if (type == 'FOLDER') {
		url = 'floder'
	}
	if ((type == 'FOLDER') || isPreviewFile(url) || isVideoFile(url)) {
		return fileICON(url)
	} else if (isImgFile(url)) {
		return thumbnailUrl(url)
	} else {
		return defaultFileExtImg
	}
}

const imgExtList = [
	'bmp',
	'jpg',
	'jpeg',
	'png',
	'tif',
	'gif',
	'pcx',
	'tga',
	'exif',
	'fpx',
	'svg',
	'psd',
	'cdr',
	'pcd',
	'dxf',
	'ufo',
	'eps',
	'ai',
	'raw',
	'wmf',
	'webp',
	'avif',
	'apng'
];

const videoExtList = [
	'mpeg',
	'avi',
	'navi',
	'asf',
	'mov',
	'3gp',
	'wmv',
	'divx',
	'xvid',
	'rm',
	'rmvb',
	'mpg',
	'flv',
	'f4v',
	'mp4'
];

const filePreviewExtList = [
	'doc',
	'docx',
	'ppt',
	'pptx',
	'xls',
	'xlsx',
	'pdf'
];

const fileExtMap = {
	'apk': '../../static/img/apk.png',
	'dmg': '../../static/img/dmg.png',
	'eddx': '../../static/img/eddx.png',
	'xls': '../../static/img/file_excel.png',
	'xlsx': '../../static/img/file_excel.png',
	'floder': '../../static/img/file_floder.png',
	'pdf': '../../static/img/file_pdf.png',
	'ppt': '../../static/img/file_ppt.png',
	'pptx': '../../static/img/file_ppt.png',
	'qita': '../../static/img/file_qita.png',
	'txt': '../../static/img/file_txt.png',
	'doc': '../../static/img/file_word.png',
	'docx': '../../static/img/file_word.png',
	'ipa': '../../static/img/ipa.png',
	'ipsw': '../../static/img/ipsw.png',
	'iso': '../../static/img/iso.png',
	'keynote': '../../static/img/keynote.png',
	'music': '../../static/img/music.png',
	'numbers': '../../static/img/numbers.png',
	'pages': '../../static/img/pages.png',
	'pkg': '../../static/img/pkg.png',
	'rar': '../../static/img/rar.png',
	'video': '../../static/img/video.png',
	'xip': '../../static/img/xip.png',
	'zip': '../../static/img/zip.png'
};
const defaultFileExtImg = '../../static/img/file_webView_error.png';




function ext(string) {
	return string.split('/').pop().split('.').pop();
}

function isImgFile(string) {
	return imgExtList.includes(ext(string).toLowerCase());
}

function isPreviewFile(string) {
	return filePreviewExtList.includes(ext(string).toLowerCase());
}

function thumbnailUrl(string) {
	var list = string.split('/');
	var name = list.pop();
	var path = string.replaceAll(name, tmpDirName + '/' + name);
	console.log(path)
	return path;
}

function isVideoFile(string) {
	return videoExtList.includes(ext(string).toLowerCase());
}

function fileICON(string) {
	return fileExtMap[ext(string).toLowerCase()] ?? defaultFileExtImg;
}


