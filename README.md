staticsite
==========

Experiments for static webpages


Create a bash script to automatically push your git repo to the ftp server

~/bin/push_static

<bash script>
cd /Users/babraham/Desktop/git_repos/staticsite
git pull

HOST=qqqqqqqq
USER=uuuuuuu
PASS=ppppppp

# -i turns off interactive prompting. -n no auto-login. -v verbose
ftp -inv $HOST << EOF

user $USER $PASS

cd public_html/
mdelete *
mput *

# folders must exist and cannot have subfolders
cd static
mdelete static/*
mput static/*

cd ../media
mdelete media/*
mput media/*

cd ../js
mdelete js/*
mput js/*

cd ../scripts
mdelete scripts/*
mput scripts/*

cd ..
# get test.txt
bye
EOF