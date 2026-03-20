#!/bin/bash

# Bing IndexNow 批量提交脚本
# 用法: ./scripts/batch-indexnow.sh [url-list-file]

INDEXNOW_KEY="9d6c6de7fda040ce8c59e0a26fae2d83"
HOST="agenticdatastack.org"
ENDPOINT="https://api.indexnow.org/indexnow"

URL_FILE="${1:-/tmp/all-urls.txt}"

if [ ! -f "$URL_FILE" ]; then
  echo "❌ 文件不存在: $URL_FILE"
  exit 1
fi

# 读取所有 URL 到 JSON 数组
URLS=$(cat "$URL_FILE" | jq -R -s -c 'split("\n") | map(select(length > 0))')

PAYLOAD=$(cat <<EOF
{
  "host": "$HOST",
  "key": "$INDEXNOW_KEY",
  "urlList": $URLS
}
EOF
)

echo "📤 提交 $(cat "$URL_FILE" | wc -l) 个 URL 到 IndexNow..."
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ 成功提交！HTTP $HTTP_CODE"
elif [ "$HTTP_CODE" = "202" ]; then
  echo "✅ 已接收！HTTP $HTTP_CODE (处理中)"
else
  echo "❌ 提交失败！HTTP $HTTP_CODE"
  echo "响应: $BODY"
  exit 1
fi
