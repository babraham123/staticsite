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
ftp -inv $HOST << EOF

user $USER $PASS

cd public_html/
mdelete *
mput html/*

# folders must exist and cannot have subfolders
cd static/
mdelete *
mput static/*

cd ../media/
mdelete *
mput media/*

cd ../js/
mdelete *
mput js/*

cd ../scripts/
mdelete *
mput scripts/*

cd ../
# get test.txt
bye
EOF