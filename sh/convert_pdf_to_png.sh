#!/bin/sh

i=0
for pdf in `find . -name '*.pdf'`
do
  convert $pdf "${pdf%.*}${i}.png"
  i=$((i++))
done
