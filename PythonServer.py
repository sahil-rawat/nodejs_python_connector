import zerorpc
from model_run import python_fn 
PORT = 42422

class PythonServer(object):
    def listen(self):
        print("Listning on"+str(PORT))
    def function(self,path):
        return python_fn(path)

try:
    s = zerorpc.Server(PythonServer())
    s.bind(f'tcp://0.0.0.0:{PORT}')
    s.run()
    print('PythonServer running...')
except Exception as e:
    print('unable to start PythonServer:', e)
    raise e
