+++
title = "记录一些自己常用的web和app"
date = 2024-10-16

[taxonomies]
tags = ["web", "app", "ai"]
+++

## [jina.ai](https://jina.ai)

用来精简网页内容和在网页中搜索关键字的AI。

示例请求
```bash
curl 'https://r.jina.ai/https://example.com' \
	-H "Authorization: Bearer jina_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

相应
```
Title: Example Domain

URL Source: https://example.com/

Markdown Content:
This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.

[More information...](https://www.iana.org/domains/example)
```