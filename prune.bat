java -jar ..\bfg.jar --strip-blobs-bigger-than 10M .

git reflog expire --expire=now --all && git gc --prune=now --aggressive

git push --force
