<?php
if ($_FILES["image"]["error"] == UPLOAD_ERR_OK) {
    $temp_name = $_FILES["image"]["tmp_name"];
    $file_name = $_FILES["image"]["name"];
    
    // Specify the directory where you want to save the uploaded images
    $upload_dir = "uploads/";
    
    // Move the uploaded file to the desired directory
    if (move_uploaded_file($temp_name, $upload_dir . $file_name)) {
        echo "File uploaded successfully!";
    } else {
        echo "Error uploading file.";
    }
} else {
    echo "Upload failed with error code: " . $_FILES["image"]["error"];
}
?>
