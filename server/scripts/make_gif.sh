usage() {
  cat <<EOF
  ${BASH_SOURCE} something went wrong!
EOF
}

getFilter() {
  if [[ -z "$1" || ! -e "$1" ]]; then
    usage
    exit 1
  fi
  local values=($(getDimensions "$1"))
  local width="${values[0]}"
  local height="${values[1]}"
  # hard coded scale
  # Todo - give user scaling options
  local filter="[0:v] scale=w=120:h=80,split [a][b];[a] palettegen [p];[b][p] paletteuse"
  echo "$filter"
}

getDimensions() {
  local dimensions="$(ffprobe "$1" 2>&1 | pcregrep -o '( \d+x\d+)(?=,)|( \d+x\d+ )')"
  # local dimensions="$(ffprobe "$1" 2>&1 | grep -Eo '[0-9]+x[0-9]+')"
  local width=$(echo "$dimensions" | cut -d 'x' -f1)
  local height=$(echo "$dimensions" | cut -d 'x' -f2)
  echo "$width" "$height"
}

convert() {
  local filename="new-file"
  local folder="${PWD}/uploads"
  local output="$folder/${filename}.gif"
  local filter=$(getFilter "$1")

  [[ -d "$folder" ]] || mkdir -p "$folder"

  if ffmpeg -y -loglevel quiet -i "$1" -filter_complex "${filter}" "$output"; then
    echo "$output"
    return 0
  else
    usage
    return 1
  fi

}

error=

[[ "$1" ]] || error=1
[[ "$1" && ! -f "$1" ]] && error=2

while [[ $error ]]; do
  case $error in
  1) echo 'no input file provided' ;;
  2) echo "$1 does not exist" ;;
  esac
  exit 1
done

convert "$@"