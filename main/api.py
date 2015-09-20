from ConfigParser import ConfigParser

class Experiment:
    def __init__(self):
        self.config = ConfigParser(allow_no_value=True)
        self.app = None

    def configure(self, conf_file):
        self.config.read(conf_file)
        self.app = self.config.get('experiment', 'app')

