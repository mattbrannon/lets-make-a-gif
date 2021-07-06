import Button from '../components/Button';

export default function Home ({ className }) {
  return (
    <div>

      <Button href="/video">Convert a video</Button>
      <Button href="/images">Convert images</Button>
    </div>
  );
}
