#! /usr/bin/bash

ffmpeg -y -loglevel quiet -i "$1" -vf "fps=12,scale=0:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "$PWD"/uploads/new-file.gif
