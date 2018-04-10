# Very simple module...

This module exposes an HTTP API and produces a sequence number in an atomic way using leveldb transactions to ensure atomicity

It can be used in distributed systems when a particular ID must be generated atomically, such that the data can be stored under this ID

