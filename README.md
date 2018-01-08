# cqcfwh
…or create a new repository on the command line

echo "# cqcfwh" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:weidongc/cqcfwh.git
git push -u origin master
…or push an existing repository from the command line

git remote add origin git@github.com:weidongc/cqcfwh.git
git push -u origin master
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.


可以通过如下命令进行代码合并【注：pull=fetch+merge]

git pull --rebase origin master
此时再执行语句 git push -u origin master即可完成代码上传到github

