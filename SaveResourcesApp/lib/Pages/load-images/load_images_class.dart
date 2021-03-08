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
          // uploading = path == lastPath  && !uploading ? true : false;

          if(path == lastPath){
            uploading = true;
          }

          if (uploading) {
             await _uploadImage( deviceId,path,nameImage);
             await prefs.setString('lastPath',path);
          }
        } else {
            await _uploadImage( deviceId,path,nameImage);
            await prefs.setString('lastPath',path);
        }
        // print("path : ${path}");
      }
    }
  }


  static _uploadImage(idDevice, path,nameImage) async {
    //ReponseDio
    Response response;
    Dio dio = new Dio();

    // Convert File to Buffer
    File file = new File(path);
    print("path : ${path}");
    Uint8List bytes = file.readAsBytesSync();


    FormData formData = FormData.fromMap({
      "deviceId": idDevice,
      "pathImage":  MultipartFile.fromBytes(bytes, filename:nameImage ),
      "pathImageOriginal":  path
    });

    print("formData : ${formData}");
    response = await dio.post("http://192.168.0.7:8080/UploadDocumentS3", data: formData);
    print("response : ${response}");
    // response =  await Dio().get("http://www.google.com");
  }

  static  _getId() async {
    var deviceInfo = DeviceInfoPlugin();
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      return androidInfo.id;
  }
}
