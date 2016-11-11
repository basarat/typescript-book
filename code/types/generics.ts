module aaa {
  class Queue {
    private data = [];
    push = (item) => this.data.push(item);
    pop = () => this.data.shift();
  }

  const queue = new Queue();
  queue.push(0);
  queue.push("1"); // Ops a mistake

  // a developer walks into a bar
  console.log(queue.pop().toPrecision(1));
  console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
}

module bbb {
  class QueueNumber {
    private data = [];
    push = (item:number) => this.data.push(item);
    pop = ():number => this.data.shift();
  }

  const queue = new QueueNumber();
  queue.push(0);
  queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

  // ^ if that error is fixed the rest would be fine too
}

module ccc {
  /** A class definition with a generic parameter */
  class Queue<T> {
    private data = [];
    push = (item:T) => this.data.push(item);
    pop = ():T => this.data.shift();
  }

  /** Again sample usage */
  const queue = new Queue<number>();
  queue.push(0);
  queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

  // ^ if that error is fixed the rest would be fine too
}
