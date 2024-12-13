import formidable from 'formidable';
import path from 'path';


const upload = formidable({
  multiples: false, 
  uploadDir: path.join(__dirname, '../uploads/images'), 
  keepExtensions: true, 
  filename: (name, ext, part, form) => {
    return Date.now() + ext;
  }
});

export default upload;
