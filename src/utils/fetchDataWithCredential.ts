type fetchDataWithoutCredentialProps = {
  url: string;
  method?: string;
  body?: unknown;
};

const fetchDataWithoutCredential = ({ url, method, body }: fetchDataWithoutCredentialProps) =>
  fetch(url, {
    method: method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
const fetchDataWithCredential = ({ url, method, body }: fetchDataWithoutCredentialProps) =>
  fetch(url, {
    method: method ?? 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
export default fetchDataWithoutCredential;
export { fetchDataWithCredential };
