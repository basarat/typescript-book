module aaa {
  class Queue {
    private data = [];
    push = (item) => this.data.push(item);
    pop = () => this.data.shift();
  }

  const queue = new Queue();
  queue.push(0);
  queue.push("1"); // Oops a mistake

  // a developer walks into a bar
  console.log(queue.pop().toPrecision(1));
  console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
}

module bbb {
  class QueueNumber {
    private data = [];
    push = (item: number) => this.data.push(item);
    pop = (): number => this.data.shift();
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
    push = (item: T) => this.data.push(item);
    pop = (): T => this.data.shift();
  }

  /** Again sample usage */
  const queue = new Queue<number>();
  queue.push(0);
  queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

  // ^ if that error is fixed the rest would be fine too
}

namespace ddd {
  const getJSON = <T>(config: {
    url: string,
    headers?: { [key: string]: string },
  }): Promise<T> => {
    const fetchConfig = ({
      method: 'GET',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(config.headers || {})
    });
    return fetch(config.url, fetchConfig)
      .then<T>(response => response.json());
  }

  type LoadUsersResponse = {
    users: {
      name: string;
      email: string;
    }[];
  };
  function loadUsers() {
    return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' });
  }
}
