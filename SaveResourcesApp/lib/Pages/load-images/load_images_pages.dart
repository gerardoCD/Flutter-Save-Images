import 'package:SaveResourcesApp/Pages/load-images/load_images_class.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SaveImages extends StatefulWidget {
  SaveImages({Key key}) : super(key: key);

  @override
  _SaveImagesState createState() => _SaveImagesState();
}

class _SaveImagesState extends State<SaveImages> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _initData();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Text('Holaaaa'),
    );
  }

  _initData() async {
    print("EntreData");
    await Resoruces.saveVideo();
  }
}
