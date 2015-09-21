from Queue import Queue


class TaskManager:
    def __init__(self):
        self.queue = Queue()
        pass

    def push_task(self, item):
        self.queue.put(item)

    def pop_task(self):
        if self.queue.empty():
            return None
        return self.queue.get()
