//  '../../utils/firebase'; 

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const serviceAccount = {
  type: 'service_account',
  project_id: 'misebox-78f9c',
  private_key_id: '6fc76064a1f39f51db2e5823998c1124c33b7d3e',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDXXiKC6eIZ/tcq\nTQW89K3oHXWYDyEBJ/GboG+iEHvpdJ++oX+8/B1Thu5A2Ej6nd1yitC7t+9Y3RRA\nD+V4hwwqCaMUp0+6VPnfjOu6giZrpH3W8RXYYJzBRtAhtp1v0JBPkxixpc7PlJcj\nLXp5lHNYpVM+LF1uTHkX6QQwP4NUnYbm/2zVnpFfPpBgtplYPBvWkIxKbES5j8T/\nWNhVfQWktgaUQTPoY5BtbmkKsltJCKKoi02eF8Pm0439598p8qRQd/Vlr8RtXpep\nVxgvZe9d/ClIxmnp9yhAIcaUpM1yxtCF9eNW1oA5jnScu+LacRSg2Obs2KYcSXTR\nGCzQnvhDAgMBAAECggEADQc0RkAYveLVKEltge85P/PcQ70SjYvZiUUMy7x8inRU\nH4eMfyWvLnjYm9KZo5N+LGoqU1i+oV0KVw+/HWnp+fcIRv0SDR8L2JKhRfCOm29h\nb2m5HRRHF0gN2iQ+ZN+0gyPOWBzEJHmEJQwgvw8UZTXnEblEU6JLpv8hEjwdWTZr\n3vb6WYzNWbl1PdftpJuHRUdN5XHL6i1CgScy6cO9Lgvrt3ZCWIVKIuD4tDPPJwyl\nxdKlcwf2dQmq3vOK+2FYtaXYnm6e1Cifd1eEpgwSYdAMuPqWYR0h8OXMAbZXVIbB\nzNFcHoGAgAWgbAg0WIVAFl62pxGU9Sy84bYI39t5pQKBgQD0Q9pK6XeBzkInoqQT\nAn4nIqLxFM4CK7J9NopFyn5C54mmgUdSv1kcO4MhQ4NZQd0pKaWq00oCfYBxN6ie\n41eEuqs1NQ2e8gJOT7GC2LAtshXzrdMA8OzIqUb3yMOYbJZZYzRKp+Z5nc5XcYGe\ndOzNn9YMZ30fx96i9tOev8LtPQKBgQDhtuHDMSOc0Xl9Sh7TqKzR0EVZjgnhTw5H\nmKeQ5hDP/YOQcmqrOUWwhxWBfsOZlxV3dqtPD85F2c2Mgq1JtVwgZIbl0W/siuz8\nm3rmslMwtl1P6r4+Ruo2Y8MVV4diGtCV5mcBI5TAWfE5sy2WIa0tbNxuYATl8igc\nsjSh1QrTfwKBgQC2evpZfJELKEvD0H1CtloIYpfYAvLkLEDryhMCkIRC9zaebXYb\nG1g2/z63WviFde8DEVnyhGaF9bw+2JXgHXcEcW/2D+xdEe8nEeJLHhaADMrZgMJh\nsZszTUL3WcTF2ll37eTi4QwNTxcXvHRZLIC8HOyL18RiOa7ZkAwITLoTAQKBgQCh\nq/rdcu8NPkWE5nhaJvFSf5mM4d5V0ehqg/9SHFhigjWgWzPoXOd73+YZkRDNjJhF\nr2xY/vtCsRU31coFh6/rS9YL+w3uIjxJW5yWbZiExbrkqUGHHghY2PA88yr3rDlH\nhXa2LCQ5+rJ8H8lBRfHjHZxuOryHcAInO8XTPOO6RQKBgQCJyaTwfmGLDH7iPCCO\nzh03OxW7QkSbWvwxBDqBhR3GVQObJrqd/NkdNEe0J236/Td7vkI9GVGQkNXcewQh\n3/G22P0LCGivdBBX3GICljnR3Ya8g+eXPVvHtee6Grs8bxlg3vghYf1DoprG358w\npoTXD0TleIjLfD8CRWetCVn+oA==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-n373e@misebox-78f9c.iam.gserviceaccount.com',
  client_id: '117824506699842384635',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n373e%40misebox-78f9c.iam.gserviceaccount.com',
};

export const app = initializeApp({
  credential: cert(serviceAccount),
});
export const firestore = getFirestore();
export { Timestamp };
