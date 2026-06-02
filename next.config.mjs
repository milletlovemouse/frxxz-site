import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const config = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/frxxz-site' : undefined,
  assetPrefix: isGithubActions ? '/frxxz-site/' : undefined,
};

export default withMDX(config);
