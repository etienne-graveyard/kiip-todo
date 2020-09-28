import ky from 'ky';
import { SyncData } from '@kiip/core';

export async function register(documentId: string, server: string, password: string) {
  const res = await ky
    .post(`${server}/register`, {
      json: {
        documentId,
        password,
      },
    })
    .json<{ token: string }>();
  return res;
}

export async function sync(documentId: string, server: string, token: string, data: SyncData) {
  const res = await ky
    .post(`${server}/sync/${documentId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      json: data,
    })
    .json<SyncData>();
  return res;
}
