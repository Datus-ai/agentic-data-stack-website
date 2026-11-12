from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse

ROOT = Path(__file__).resolve().parents[1] / 'out'
class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def translate_path(self, request_path):
        result = super().translate_path(request_path)
        target = Path(result)
        html = Path(result.rstrip('/') + '.html')
        if (not target.exists() or (target.is_dir() and not (target / 'index.html').is_file())) and html.is_file():
            return str(html)
        return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Preview the exported Agentic Data Stack website')
    parser.add_argument('--port', type=int, default=8080)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), PreviewHandler)
    print(f'English: http://localhost:{args.port}/')
    print(f'中文: http://localhost:{args.port}/zh')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
