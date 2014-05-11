staticsite
==========

Experiments for static webpages


Create a bash script to automatically push your git repo to the ftp server

~/bin/push_static

<bash script>
cd /Users/babraham/Desktop/git_repos/staticsite
git pull

HOST=hhhhhh
USER=uuuuuu
PASS=ppppp

# -i turns off interactive prompting. -n no auto-login. -v verbose
# folders must exist and cannot have subfolders

ftp -inv $HOST << EOF
user $USER $PASS

cd public_html/
lcd html/
mdelete *
mput *
lcd ..
cd static/
lcd static/
mdelete *
mput *
cd ..
lcd ..
cd media/
lcd media/
mdelete *
mput *
cd ..
lcd ..
cd js/
lcd js/
mdelete *
mput *
cd ..
lcd ..
cd scripts/
lcd scripts/
mdelete *
mput *
cd ..
lcd ..
bye
EOF

