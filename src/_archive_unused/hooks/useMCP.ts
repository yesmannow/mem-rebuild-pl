/**
 * MCP Client Hooks
 * React hooks for interacting with MCP Optimization Server
 */

const MCP_BASE_URL = process.env.VITE_MCP_URL || 'http://localhost:8000';

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  url: string;
  timestamp?: string;
  user_agent?: string;
  connection_type?: string;
}

export interface ImageOptimizationRequest {
  image_url: string;
  formats?: string[];
  widths?: number[];
  quality?: number;
  preserve_metadata?: boolean;
}

export interface PageData {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  author?: string;
  published_time?: string;
  modified_time?: string;
  section?: string;
  tags?: string[];
  keywords?: string[];
}

/**
 * Performance Analytics Hook
 */
export const usePerformanceAnalytics = () => {
  const reportPerformance = async (metrics: PerformanceMetrics) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/analytics/performance-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...metrics,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          connection_type: (navigator as any).connection?.effectiveType || 'unknown',
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to report performance metrics:', error);
      return null;
    }
  };

  const getMetrics = async (url: string) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/analytics/metrics/${encodeURIComponent(url)}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to get metrics:', error);
      return null;
    }
  };

  return { reportPerformance, getMetrics };
};

/**
 * Image Optimization Hook
 */
export const useImageOptimization = () => {
  const optimizeImage = async (request: ImageOptimizationRequest) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/images/optimize-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formats: ['webp', 'avif'],
          widths: [400, 800, 1200, 1600],
          quality: 85,
          ...request,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to optimize image:', error);
      return null;
    }
  };

  const optimizeBatch = async (requests: ImageOptimizationRequest[]) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/images/optimize-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requests),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to optimize images:', error);
      return null;
    }
  };

  return { optimizeImage, optimizeBatch };
};

/**
 * SEO Generation Hook
 */
export const useSEOGeneration = () => {
  const generateMeta = async (pageData: PageData) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/seo/generate-meta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to generate SEO meta:', error);
      return null;
    }
  };

  const validateSEO = async (pageData: PageData) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/seo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to validate SEO:', error);
      return null;
    }
  };

  return { generateMeta, validateSEO };
};

/**
 * Bundle Analysis Hook
 */
export const useBundleAnalysis = () => {
  const analyzeBundle = async (buildOutput: string, thresholdKb: number = 100) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/bundles/analyze-bundle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          build_output: buildOutput,
          threshold_kb: thresholdKb,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to analyze bundle:', error);
      return null;
    }
  };

  const analyzeBuild = async (buildDir: string = 'dist') => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/bundles/analyze-build?build_dir=${buildDir}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to analyze build:', error);
      return null;
    }
  };

  return { analyzeBundle, analyzeBuild };
};

/**
 * Lighthouse Audit Hook
 */
export const useLighthouseAudit = () => {
  const runAudit = async (url: string, device: 'desktop' | 'mobile' = 'desktop') => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/lighthouse/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          device,
          categories: ['performance', 'accessibility', 'best-practices', 'seo'],
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to run Lighthouse audit:', error);
      return null;
    }
  };

  return { runAudit };
};

/**
 * Resource Hints Hook
 */
export const useResourceHints = () => {
  const generateHints = async (request: {
    page_url: string;
    critical_resources: string[];
    next_pages?: string[];
    external_domains?: string[];
  }) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/resource-hints/generate-hints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to generate resource hints:', error);
      return null;
    }
  };

  return { generateHints };
};

/**
 * Content Analysis Hook
 */
export const useContentAnalysis = () => {
  const analyzeContent = async (content: string, pageType: string, targetKeywords?: string[]) => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/content/analyze-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          page_type: pageType,
          target_keywords: targetKeywords || [],
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to analyze content:', error);
      return null;
    }
  };

  return { analyzeContent };
};

/**
 * Cache Optimization Hook
 */
export const useCacheOptimization = () => {
  const generateStrategy = async (assetTypes: string[], platform: string = 'vercel') => {
    try {
      const response = await fetch(`${MCP_BASE_URL}/cache/generate-strategy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset_types: assetTypes,
          platform,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to generate cache strategy:', error);
      return null;
    }
  };

  return { generateStrategy };
};

/**
 * Main MCP Hook - combines all services
 */
export const useMCP = () => {
  const performance = usePerformanceAnalytics();
  const images = useImageOptimization();
  const seo = useSEOGeneration();
  const bundles = useBundleAnalysis();
  const lighthouse = useLighthouseAudit();
  const resourceHints = useResourceHints();
  const content = useContentAnalysis();
  const cache = useCacheOptimization();

  return {
    performance,
    images,
    seo,
    bundles,
    lighthouse,
    resourceHints,
    content,
    cache,
  };
};
