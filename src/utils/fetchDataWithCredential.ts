type fetchDataWithCredentialProps = {
  url: string;
  method?: string;
  body?: unknown ;
};

const fetchDataWithCredential = ({ url, method, body }: fetchDataWithCredentialProps) =>
  fetch(url, {
    method: method ?? 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export default fetchDataWithCredential;
