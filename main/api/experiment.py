import abc
from task_manager import TaskManager


class Experiment:

    __metaclass__ = abc.ABCMeta

    def __init__(self):
        self.task_manager = TaskManager()

    @abc.abstractmethod
    def next(self):
        pass
