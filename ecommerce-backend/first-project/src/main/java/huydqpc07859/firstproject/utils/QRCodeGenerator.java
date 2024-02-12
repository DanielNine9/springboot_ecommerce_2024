package huydqpc07859.firstproject.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import huydqpc07859.firstproject.model.product.Product;


import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class QRCodeGenerator {

    public static void generateQRCode(Product product) throws WriterException, IOException {
        String qrCodePath = "uploads";
        String qrCodeName = qrCodePath + "/" +product.getName()+product.getId()+"-QRCODE.png";
        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                "ID: "+product.getId()+ "\n"+
                        "Name: "+product.getName()+ "\n"+
                        "Description: "+product.getDescription()+ "\n"+
                        "ImageUrl: "+product.getImageUrl()+ "\n"
                , BarcodeFormat.QR_CODE, 400, 400);
        Path path = FileSystems.getDefault().getPath(qrCodeName);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

    }

//    public static void generateQRCode(Object object) throws WriterException, IOException {
//        String qrCodePath = "uploads";
//        String qrCodeName = qrCodePath + "/" +object.getClass().getName()+product.getId()+"-QRCODE.png";
//        var qrCodeWriter = new QRCodeWriter();
//        BitMatrix bitMatrix = qrCodeWriter.encode(
//                "ID: "+product.getId()+ "\n"+
//                        "Name: "+product.getName()+ "\n"+
//                        "Description: "+product.getDescription()+ "\n"+
//                        "ImageUrl: "+product.getImageUrl()+ "\n"
//                , BarcodeFormat.QR_CODE, 400, 400);
//        Path path = FileSystems.getDefault().getPath(qrCodeName);
//        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
//
//    }
}