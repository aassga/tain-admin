npm run build
ssh jason@35.201.143.19 "sudo rm -rf /mydata/html/fadmin/*"
scp -r dist/* jason@35.201.143.19:/mydata/html/fadmin/