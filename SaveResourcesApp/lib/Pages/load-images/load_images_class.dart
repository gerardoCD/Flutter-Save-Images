import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:storage_path/storage_path.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:device_info/device_info.dart';

class Resoruces {
  Resoruces._privateConstructor();

  static final Resoruces _instance = Resoruces._privateConstructor();

  factory Resoruces() {
    return _instance;
  }

  static bool uploading = false;

  static saveImages() async {
    var imagePaths = await StoragePath.imagesPath;
    var imagePathsDescode = jsonDecode(imagePaths);
    var nameImage;

    //Get device id
    var deviceId = await _getId();

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var lastPath = prefs.getString("lastPath");

    for (var pathsFolder in imagePathsDescode) {
      for (var path in pathsFolder["files"]) {
        nameImage = path.split('/').last;
        if (lastPath != null) {
          if (path == lastPath) {
            uploading = true;
          }

          if (uploading) {
            await _uploadImage(deviceId, path, nameImage);
            await prefs.setString('lastPath', path);
          }
        } else {
          await _uploadImage(deviceId, path, nameImage);
          await prefs.setString('lastPath', path);
        }
        // print("path : ${path}");
      }
    }
  }

  static saveVideo() async {
    var videoPath = await StoragePath.videoPath;
    var videoPathsDescode = jsonDecode(videoPath);
    print("videoPathsDescode : ${videoPathsDescode}");
    var nameVideo;

    //Get device id
    var deviceId = await _getId();

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var lastPath = prefs.getString("lastPath");

    for (var pathsFolder in videoPathsDescode) {
      for (var path in pathsFolder["files"]) {
        var realPath = path["path"];
        nameVideo = realPath.split('/').last;
        print("nameVideo : ${nameVideo}");
        if (lastPath != null) {
          if (path == lastPath) {
            uploading = true;
          }

          if (uploading) {
            // await _uploadVideo(deviceId, path, nameVideo);
            await prefs.setString('lastPath', realPath);
          }
        } else {
          // await _uploadVideo(deviceId, path, nameVideo);
          await prefs.setString('lastPath', realPath);
        }
      }
    }
  }

  static _uploadVideo(idDevice, path, nameVideo) async {
    Response response;
    Dio dio = new Dio();

    // Convert File to Buffer
    File file = new File(path);
    Uint8List bytes = file.readAsBytesSync();

    FormData formData = FormData.fromMap({
      "deviceId": idDevice,
      "pathImage": MultipartFile.fromBytes(bytes, filename: nameVideo),
      "pathImageOriginal": path
    });

    response = await dio.post("http://192.168.0.7:8080/UploadDocumentS3",
        data: formData);
    print("response : ${response}");
  }

  static _uploadImage(idDevice, path, nameVideo) async {
    //ReponseDio
    Response response;
    Dio dio = new Dio();

    // Convert File to Buffer
    File file = new File(path);
    Uint8List bytes = file.readAsBytesSync();

    FormData formData = FormData.fromMap({
      "deviceId": idDevice,
      "pathImage": MultipartFile.fromBytes(bytes, filename: nameVideo),
      "pathImageOriginal": path
    });

    response = await dio.post("http://192.168.0.7:8080/UploadDocumentS3",
        data: formData);
    print("response : ${response}");
  }

  static _getId() async {
    var deviceInfo = DeviceInfoPlugin();
    AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
    return androidInfo.id;
  }
}
